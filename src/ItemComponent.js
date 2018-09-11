import React, { Component } from 'react';
import './ItemComponent.scss';

class ItemComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
        isFavourite: props.item.isFavourite,
      };
    }

    addToFavourites = () => {
      this.setState({
        isFavourite: true,
      });
      this.props.addToFavourites({
        ...this.props.item,
        isFavourite: true,
      });
    }
    
    removeFromFavourites = () => {
      this.setState({
        isFavourite: false,
      });
      this.props.removeFromFavourites(this.props.item);
    }

    render(){
      const { farm, server, id, secret, title, owner} = this.props.item;
      const { isFavourite } = this.state;
      const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      return (
        <div className='itemContainer'>
          <img src={url} className='itemImage'/>
          <div className='itemHover'>
            <div className='itemTitle'>{title}</div>
            <hr/>
            <div className='itemOwner'>{owner}</div>
            {isFavourite
              ? <div className='favouriteButton' onClick={this.removeFromFavourites}>
                  Remove from favourites
                </div>
              : <div className='favouriteButton' onClick={this.addToFavourites}>
                  Favourite
                </div>
            }
          </div>
        </div>
      );
  }
}

export default ItemComponent;