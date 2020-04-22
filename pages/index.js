import Link from 'next/link';
import Head from 'next/head';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';

const HomePage = () => {
    return (
        <div className='homepage'>
            <Particles canvasClassName='particles' params={config} />
            <Head>
                <title>Star Wars</title>
            </Head>
            <div className="content">
                <h1 className="title">Star Wars Enciclopaeda!</h1>
                <p className="description">Click on any link to see Star Wars info!</p>
                <ul className="links">
                    <Link href='/films'>
                        <li className="links__item">
                            <a>Films</a>
                        </li>
                    </Link>
                    <Link href='/people'>
                        <li className="links__item">
                            <a>People</a>
                        </li>
                    </Link>
                    <Link href='/planets'>
                        <li className="links__item">
                            <a>Planets</a>
                        </li>
                    </Link>
                    <Link href='/species'>
                        <li className="links__item">
                            <a>Species</a>
                        </li>
                    </Link>
                    <Link href='/starships'>
                        <li className="links__item">
                            <a>Starships</a>
                        </li>
                    </Link>
                    <Link href='/vehicles'>
                        <li className="links__item">
                            <a>Vehicles</a>
                        </li>
                    </Link>
                </ul>
            </div>

        </div>

    );
}

export default HomePage;