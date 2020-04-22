import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';

const Starships = (props) => {
    let starships = [];
    for (let starship in props) {
        starships.push(props[starship]);
    }
    console.log(starships[0]);
    let list = starships.map((ss, i) => {
        if (i != starships.length - 1) {
            let theId = ss.name.split(' ').join('');
            return (
                <li className='list' key={i} id={theId}>
                    <h1 className='list-title'>{ss.name}</h1>
                    <p className='list-item'>Model: {ss.model}</p>
                    <p className='list-item'>Manufacturer: {ss.manufacturer}</p>
                    <p className='list-item'>Cost (credits): {ss.cost_in_credits}</p>
                    <p className='list-item'>Length: {ss.length} km</p>
                    <p className='list-item'>Max Atmospheric Speed: {ss.max_atmosphering_speed}</p>
                    <p className='list-item'>Crew: {ss.crew}</p>
                    <p className='list-item'>Passengers: {ss.passengers}</p>
                    <p className='list-item'>Cargo Capacity: {ss.cargo_capacity} kg</p>
                    <p className='list-item'>Duration: {ss.consumables}</p>
                    <p className='list-item'>Hyperdrive Rating: {ss.hyperdrive_rating}</p>
                    <p className='list-item'>Class: {ss.starship_class}</p>
                </li>
            );
        }
    });
    let idList = starships.map((ss, i) => {
        if (i != starships.length - 1) {
            let theId = ss.name.split(' ').join('');
            return (theId);
        }
    });
    return (
        <div>
            <Particles canvasClassName='particles' params={config} />
            <Navbar list={idList} />
            <div className="content move">
                <h1 className='title'>Starships</h1>
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

Starships.getInitialProps = async function () {
    const rawData = await fetch('https://swapi.dev/api/starships');
    const data = await rawData.json();
    let array = data.results;

    //checks if there is another page of data
    if (data.count > 10) {
        let timesToCall = data.count / 10;
        console.log(Math.ceil(timesToCall));

        //loops to get all other page data
        for (let i = 2; i <= Math.ceil(timesToCall); i++) {
            let nextPage = await fetch(`https://swapi.dev/api/starships/?page=${i}`);
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

    //array is turned into object so props can be easily handled
    let object = {};
    for (let k = 0; k < array.length - 1; k++) {
        object[array[k].name] = array[k];
    }
    return object;
}

export default Starships;