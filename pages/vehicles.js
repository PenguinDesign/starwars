import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';

const Vehicles = (props) => {
    let vehicles = [];
    for (let vehicle in props) {
        vehicles.push(props[vehicle]);
    }
    let list = vehicles.map((veh, i) => {
        if (i != vehicles.length - 1) {
            let theId = veh.name.split(' ').join('');

            return (
                <li className='list' id={theId} key={i}>
                    <h1 className='list-title'>{veh.name}</h1>
                    <p className='list-item'>Model: {veh.model}</p>
                    <p className='list-item'>Manufacturer: {veh.manufacturer}</p>
                    <p className='list-item'>Cost (credits): {veh.cost_in_credits}</p>
                    <p className='list-item'>Length: {veh.length} km</p>
                    <p className='list-item'>Max Atmospheric Speed: {veh.max_atmosphering_speed}</p>
                    <p className='list-item'>Crew: {veh.crew}</p>
                    <p className='list-item'>Passengers: {veh.passengers}</p>
                    <p className='list-item'>Cargo Capacity: {veh.cargo_capacity} kg</p>
                    <p className='list-item'>Duration: {veh.consumables}</p>
                    <p className='list-item'>Class: {veh.starship_class}</p>
                </li>
            );
        }
    })
    let idList = vehicles.map((veh, i) => {
        if (i != vehicles.length - 1) {
            let theId = veh.name.split(' ').join('');
            return (theId);
        }
    })
    return (
        <div>
            <Particles canvasClassName='particles' params={config} />
            <Navbar list={idList} />
            <div className="content move">
                <h1 className='title'>Vehicles</h1>
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

Vehicles.getInitialProps = async function () {
    const rawData = await fetch('https://swapi.dev/api/vehicles');
    const data = await rawData.json();
    let array = data.results;

    //checks if there is another page of data
    if (data.count > 10) {
        let timesToCall = data.count / 10;

        //loops to get all other page data
        for (let i = 2; i <= Math.ceil(timesToCall); i++) {
            let nextPage = await fetch(`https://swapi.dev/api/vehicles/?page=${i}`);
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

export default Vehicles;