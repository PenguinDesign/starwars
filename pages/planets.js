import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';


const Planets = (props) => {
    let planets = [];
    for (let planet in props) {
        planets.push(props[planet]);
    }
    console.log(planets);
    let list = planets.map((pla, i) => {
        if (i != planets.length - 1) {
            let theId = pla.name.split(' ').join('');
            return (
                <li className='list' id={theId} key={i}>
                    <h1 className='list-title'>{pla.name}</h1>
                    <p className='list-item'>Rotation Period: {pla.rotation_period} hours</p>
                    <p className='list-item'>Orbital Period: {pla.orbital_period} days</p>
                    <p className='list-item'>Diameter: {pla.diameter} km</p>
                    <p className='list-item'>Climate: {pla.climate}</p>
                    <p className='list-item'>Gravity: {pla.gravity}</p>
                    <p className='list-item'>Terrain: {pla.terrain}</p>
                    <p className='list-item'>Surface water: {pla.surface_water}</p>
                    <p className='list-item'>Population: {pla.population}</p>
                </li>
            );
        }
    });
    let idList = planets.map((pla, i) => {
        if (i != planets.length - 1) {
            let theId = pla.name.split(' ').join('');
            return (theId);
        }
    })

    return (
        <div>
            <Particles canvasClassName='particles' params={config} />
            <Navbar list={idList} />
            <div className="content move">
                <h1 className='title'>Planets</h1>
                <ul className='description'>
                    {list}
                </ul>
                <Link href="/">
                    <a className='description'>Go back</a>
                </Link>
            </div>
        </div>
    );
}

Planets.getInitialProps = async function () {
    const rawData = await fetch('https://swapi.dev/api/planets');
    const data = await rawData.json();
    let array = data.results;

    //checks if there is another page of data
    if (data.count > 10) {
        let timesToCall = data.count / 10;
        console.log(Math.ceil(timesToCall));

        //loops to get all other page data
        for (let i = 2; i <= Math.ceil(timesToCall); i++) {
            let nextPage = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
            let nextData = await nextPage.json();
            let people = [];

            //loops every person in the next data page, pushes it to people array
            for (let person in nextData.results) {
                let newPerson = nextData.results[person];
                people.push(newPerson);
            }

            //all people found in the new pages are pushed to the main array of people
            array.push(...people);
        }
    }

    console.log(array);

    //array is turned into object so props can be easily handled
    let object = {};
    for (let k = 0; k < array.length - 1; k++) {
        object[array[k].name] = array[k];
    }
    return object;
}

export default Planets;