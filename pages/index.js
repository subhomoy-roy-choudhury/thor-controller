import FolderCards from './components/folder_cards.js';
import Layout from './components/layout';

export default function Home() {
  return (
    <div>
      <Layout>
        <h1 className="text-3xl font-bold text-center pt-5">
          Integrated Scripts
        </h1>
        <FolderCards />
      </Layout>
    </div>

  )
}