import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav.js'
import * as bp3 from '@blueprintjs/core'
import style from '../styles/components/main.module.css'
export default function Home() {
    return (
        <div className={style.main}>
            <bp3.Card interactive elevation={bp3.Elevation.TWO}>
                Hello World
            </bp3.Card>
        </div>
    )
}
