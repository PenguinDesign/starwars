import Link from 'next/link';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            link: '',
        }
    }

    render() {
        const changeInput = (event) => {
            let regex = new RegExp(`${this.state.input}`, 'gi');
            let filterList = this.props.list.filter(item => {
                return regex.test(item);
            });
            if (filterList.length != 0) {
                let searchElement = filterList[0];
                let newLink = '#' + searchElement;
                console.log(newLink);
                this.setState({
                    input: event.target.value,
                    link: newLink
                });
                console.log(this.state.link)
            } else {
                this.setState({
                    input: event.target.value
                })
            }
        }
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <h2 className='navbar-title'>Star Wars Enciclopaeda</h2>
                    <Link href='/'>
                        <button className='back'>Go back</button>
                    </Link>
                </div>
                <div className="navbar-right">
                    <input className='search' onChange={() => changeInput(event)} value={this.state.input} type="text" />
                    <a className='search-name' href={this.state.link}>
                        Search
                    </a>
                </div>

            </nav>
        );
    }
}

export default Navbar;