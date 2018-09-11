import React, { Component } from 'react';
import './App.scss';
import { getImages } from './api';
import ItemComponent from './ItemComponent';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1,
      items: [],
      isLoading: true,
      favourites: [],
    }
  }
  
  componentDidMount() {
    this.loadFavourites();
    this.setImages();
    this.refs.infinityScroll.addEventListener('scroll', this.handleScroll);
    window.addEventListener(
      'beforeunload',
      this.saveFavouritesToLocalStorage
    );
  }
  
  componentWillUnmount() {
    this.refs.infinityScroll.removeEventListener(
      'scroll',
      this.handleScroll
    );
    
    window.removeEventListener(
      'beforeunload',
      this.saveFavouritesToLocalStorage
    );
    
    this.saveFavouritesToLocalStorage();
  }
  
  handleScroll = () => {
    if (this.refs.infinityScroll.scrollTop + this.refs.infinityScroll.clientHeight >= this.refs.infinityScroll.scrollHeight){
      let page = this.state.page;
      this.setState({
        isLoading: true,
        page: page + 1,
      });

      this.setImages(this.state.page);
    }
  }
  
  setImages = () => {
    getImages(this.state.page).then((result)=>{
      const { items } = this.state;
      this.setState({
        items: items.concat(result.photos.photo),
        isLoading: false,
      });
    });
  }
  
  renderItem = (item, index) => {
    return (
      <ItemComponent 
        key={index}
        item={item}
        addToFavourites={this.addToFavourites}
        removeFromFavourites={this.removeFromFavourites}
      />);
  }
  
  loadFavourites = () => {
    try {
      const favourites = JSON.parse(localStorage.getItem('favourites'));
      if (favourites) {
        this.setState({
          favourites,
          items: favourites,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  saveFavouritesToLocalStorage = () => {
    const { favourites } = this.state;
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
  
  addToFavourites = (item) => {
    const { favourites } = this.state;
    favourites.push(item);
    
    this.setState({
      favourites,
    });
  }
  
  removeFromFavourites = (item) => {
    const { favourites } = this.state;
    this.setState({
      favourites: favourites.filter((favourite) => favourite.id !== item.id),
    });
  }
  
  render() {
    const { items, isLoading } = this.state;
    return (
      <div className='app' ref='infinityScroll' style={{ height: window.innerHeight }}>
        {items 
          ? items.map(this.renderItem)
          : null
        }
        {isLoading ? 
          <div className='spinnerContainer'>
            <div className='spinner'></div>
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
