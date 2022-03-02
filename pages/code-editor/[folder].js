import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import axios from 'axios'
import Layout from '../components/layout';
const CodeWithCodemirror = dynamic(import('../components/code-with-codemirror'), {ssr: false})

// https://nextjs.org/docs/routing/dynamic-routes

export default function CodeEditor() {
    const { query } = useRouter();

    const [url, setURL] = useState('')
    const backend_url = `${url}/api/script_builder/code/editor/?dir_path=${query["folder"]}`
    const [data, setData] = useState('');
    const [result, setResult] = useState("Test Cases :-")

    useEffect(() => {
        setURL(localStorage.getItem('ngrok-url'))
        console.log(query)
        axios.get(backend_url)
            .then(response => {
                console.log(response.data.code);
                setData(response.data.code);
            })
            .catch((err) => {
                console.log('catch', err);
             });
    }, [backend_url])

    const format_test_cases = (key,id,trackback) => {
        var formatted_txt = `>>> ${key} :- \n ${id} \n${trackback}\n`
        return formatted_txt
    }

    const test_code = async () => {
        const backend_url = `${localStorage.getItem('ngrok-url')}/api/script_builder/code/test/`
        axios.post(backend_url,{
            'dir_path' : `scripts_folder/${query["folder"]}`
        })
        .then(response => {
            console.log(response.data.tests);
            var resp = response.data.tests
            var test_result = `Test Results For ${query["folder"]} :-\n`
            for (var key in resp) {
                alert(key+': '+resp[key][0]['id'] +'\n'+ resp[key][0]['trackback']); // this will show each key with it's value
                test_result = test_result + format_test_cases(key,resp[key][0]['id'],resp[key][0]['trackback'])
            }
            setResult(test_result);
        })
        .catch((err) => {
            console.log('catch', err);
        });
    }

    const save_code = async (filename) => {
        console.log(filename)
    }




    return (
        <Layout>
            <section>
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mx-5 my-4 py-3 px-20 border border-blue-500 hover:border-transparent rounded"
                    onClick={test_code}
                >
                    Test
                </button>
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="col-span-2">
                            <span className='px-5'>{key}</span>
                            <button 
                                className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => save_code(key)}
                            >
                                Save Code
                            </button>
                            <CodeWithCodemirror
                                options={{
                                    lineNumbers : true,
                                    theme: 'material',
                                    indentUnit: 4,
                                    matchBrackets: true,
                                    mode: {
                                        name: "python",
                                        version: 3,
                                        singleLineStringErrors: false
                                    },
                                }} 
                                value={value} 
                            />
                        </div>
                    ))}
                    <div className="row-span-2 col-span-3 h-full">
                        <span className='px-5'>Test Cases Results :-</span>
                        <CodeWithCodemirror
                            options={{
                                theme: 'material',
                                mode: 'text',
                                readOnly : true,
                            }} 
                            value={result} 
                        />
                    </div>
                </div>
            </section>
        </Layout>
    )
}
  