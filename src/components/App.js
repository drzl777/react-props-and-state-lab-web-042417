import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  adoptPet(petId) {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId]
    })
  }

  changePetType(petType) {
    this.setState({
      filters: {
        type: petType
      }
    })
  }

  findPetsClick() {
    const petType = this.state.filters.type
    const query = petType === 'all' ? '' : '?type='+petType
    const fetchUrl = '/api/pets' + query
    this.setState({
      pets: fetch(fetchUrl)
    })
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.changePetType.bind(this)} onFindPetsClick={this.findPetsClick.bind(this)} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
