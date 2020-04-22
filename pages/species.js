import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';

class Species extends React.Component {
    constructor() {
        super();
        this.state = {
            props: {},
            loading: true
        }
    }
    async componentDidMount() {
        const rawData = await fetch('https://swapi.dev/api/species');
        const data = await rawData.json();
        let array = data.results;
        //checks if there is another page of data
        if (data.count > 10) {
            let timesToCall = data.count / 10;
            console.log(Math.ceil(timesToCall));
            //loops to get all other page data
            for (let i = 2; i <= Math.ceil(timesToCall); i++) {
                let nextPage = await fetch(`https://swapi.dev/api/species/?page=${i}`);
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
        this.setState({
            loading: false,
            props: object
        })
    }
    render() {
        let species = [];
        for (let specie in this.state.props) {
            species.push(this.state.props[specie]);
        }
        let list = species.map((sp, i) => {
            if (i != species.length - 1) {
                let theId = sp.name.split(' ').join('');
                return (
                    <li className='list' id={theId} key={i}>
                        <h2 className='list-title'>{sp.name}</h2>
                        <p className='list-item'>Classification: {sp.classification}</p>
                        <p className='list-item'>Mind: {sp.designation}</p>
                        <p className='list-item'>Height: {sp.average_height} cm</p>
                        <p className='list-item'>Skin colors: {sp.skin_colors}</p>
                        <p className='list-item'>Hair colors: {sp.hair_colors}</p>
                        <p className='list-item'>Eye colors: {sp.eye_colors}</p>
                        <p className='list-item'>Lifespan: {sp.average_lifespan} years</p>
                        <p className='list-item'>Language: {sp.language}</p>
                    </li>
                );
            }
        });
        let idList = species.map((sp, i) => {
            if (i != species.length - 1) {
                let theId = sp.name.split(' ').join('');
                return (theId);
            }
        })

        return this.state.loading ? <h1 className="title">Loading</h1> : (
            <div>
                <Particles canvasClassName='particles' params={config} />
                <Navbar list={idList} />
                <div className="content move">
                    <h1 className='title'>Species</h1>
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
}

export default Species;