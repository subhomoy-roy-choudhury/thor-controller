import FolderCards from './components/folder_cards.js';
import Navbar from './components/navbar.js';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl font-bold text-center pt-5">
        Integrated Scripts
      </h1>
      <FolderCards />
    </div>

  )
}