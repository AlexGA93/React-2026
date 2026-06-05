/*
Variables que no cambian pueden ir fuera del componente
*/
const title = 'My Awesome App';
const description = 'Esta es mi primera aplicación con React';

const favoriteColors = ['red', 'green', 'blue'];

const isActive = true;

const address = {
    street: '123 Main St',
    city: 'Anytown',
    country: 'USA',
};

const myStyle = {
    color: 'blue', 
    fontWeight: 'bold',
    backgroundColor: isActive ? 'lightgray' : 'white',
};

export default function MyAwesomeApp() {
    

    return (
        <>
            <h1>{title}</h1>
            <h3>{description}</h3>
            <p>{favoriteColors.join(', ')}</p>
            <h4>{isActive ? 'Active' : 'Inactive'}</h4>
            <p>{JSON.stringify(address)}</p>
            <p
            style={myStyle}
            >{address.street}, {address.city}, {address.country}</p>
        </>
    );
}