import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';

class People extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            props: {}
        }
    }
    async componentDidMount() {
        const rawData = await fetch('https://swapi.dev/api/people');
        const data = await rawData.json();
        let array = data.results;
        //checks if there is another page of data
        if (data.count > 10) {
            let timesToCall = data.count / 10;
            console.log(Math.ceil(timesToCall));
            //loops to get all other page data
            for (let i = 2; i <= Math.ceil(timesToCall); i++) {
                let nextPage = await fetch(`https://swapi.dev/api/people/?page=${i}`);
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
        console.log(object);
        this.setState({
            loading: false,
            props: object
        })
    }

    render() {
        let people = [];
        for (let person in this.state.props) {
            people.push(this.state.props[person]);
        }
        let list = people.map((char, i) => {
            if (i != people.length - 1) {
                let theId = char.name.split(' ').join('');

                return (
                    <li className='list' id={theId} key={i}>
                        <h1 className='list-title'>{char.name}</h1>
                        <p className='list-item'>Height: {char.height}</p>
                        <p className='list-item'>Weight: {char.weight}</p>
                        <p className='list-item'>Hair: {char.hair_color}</p>
                        <p className='list-item'>Skin: {char.skin_color}</p>
                        <p className='list-item'>Eyes: {char.eye_color}</p>
                        <p className='list-item'>Birth Year: {char.birth_year}</p>
                        <p className='list-item'>Gender: {char.gender}</p>
                    </li>
                )
            }
        })
        let idList = people.map((char, i) => {
            if (i != people.length - 1) {
                let theId = char.name.split(' ').join('');
                return (theId);
            }
        })
        return this.state.loading ? <h1 className='title'>Loading</h1> :
            (
                <div>
                    <Particles canvasClassName='particles' params={config} />
                    <Navbar list={idList} />
                    <div className="content move">
                        <h1 className='title'>People</h1>
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

export default People;