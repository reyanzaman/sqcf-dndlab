import Image from "next/image";
import "../styles/home.css";
import classnames from 'classnames';
import db from '@/modules/db'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div>Hello World</div>
    </main>
  )
}
