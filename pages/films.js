import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Particles from 'react-particles-js';
import config from '../components/particleConfig';


class Films extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            props: []
        }
    }

    async componentDidMount() {
        const rawData = await fetch('https://swapi.dev/api/films');
        const data = await rawData.json();
        console.log(data.results);
        this.setState({
            loading: false,
            props: data.results
        })
    }

    render() {

        const movies = this.state.props.map((movie, i) => {
            return (<div className="list" id={i} key={i}>
                <h3 className='list-title'>{movie.title}</h3>
                <p className='list-item'>Episode {movie.episode_id}</p>
                <p className='list-item'>Directed by {movie.director}</p>
                <p className='list-item'>Produced by {movie.producer}</p>
                <p className='list-item'>Released: {movie.release_date}</p>
            </div>);
        })
        return this.state.loading ? <h1 className='title'>Loading</h1> : (
            <div>
                <Particles canvasClassName='particles' params={config} />
                <div className="content">
                    <h1 className='title'>Films</h1>
                    <ul className='description'>
                        {movies}
                    </ul>
                    <Link href="/">
                        <a className='description'>Go back</a>
                    </Link>
                </div>
            </div>
        );
    }
}



export default Films;