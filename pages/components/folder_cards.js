import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import AddFolderModal from '../components/add_folder_modal'
import DeleteFolderModal from '../components/delete_folder_modal'

export default function FolderCards() {
    const [url, setURL] = useState('')
    const backend_url = `${url}/api/script_builder/upload/list/`
    const [data, setData] = useState([]);

    useEffect(() => {
        setURL(localStorage.getItem('ngrok-url'))
        axios.get(backend_url)
            .then(response => {
                console.log(response.data.dir_list);
                setData(response.data.dir_list);
            })
            .catch((err) => {
                console.log('catch', err);
             });
    }, [backend_url])


    return (
        <section className='m-10'>
            <AddFolderModal />
            <div className='flex flex-wrap mx-4 justify-left'>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="py-6 pl-6 pr-20 mt-10 mr-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{key}</h5>
                        </a>
                        {value.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    <DeleteFolderModal />
                    <Link href={`/code-editor/${key}`}>
                        <button className="inline-flex items-center ml-2 py-2 px-3 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Code Editor
                            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </Link>
                    </div>
                ))}
            </div>
        </section>
  
    )
  }

  