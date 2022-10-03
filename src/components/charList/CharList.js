import { useState, useEffect, useRef } from 'react';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'

const CharList = (props) => {

    const [charList, setCharlist] = useState([]),
          [newItemLoading, setNesItemLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false),
          {loading, error, getAllCharacters} = useMarvelService();



    useEffect(() => {
        onRequest(offset, true);
    }, [])



    const onRequest = (offset, initial) =>{
        initial ? setNesItemLoading(false) : setNesItemLoading(true);
        getAllCharacters(offset)
        .then(onCharListLoaded)

    }

    

    const onCharListLoaded = (newCharList) =>{

        let ended = false;
        if (newCharList.length < 9){
            ended = true; 
        }

        setCharlist(charList => [...charList, ...newCharList]);
        setNesItemLoading( newItemLoading => false);
        setOffset( offset => offset+9);
        setCharEnded( charEnded => ended);
    }



    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

   function renderItems(arr){
        const items = arr.map((item, i)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit' : 'unset'}
            }

            return (
                <li
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    className="char__item"
                    key={item.id}
                    onClick={()=> {
                        props.onCharSelected(item.id)
                        focusOnItem(i);
                        }}
                        onKeyPress={(e)=>{
                            if(e.key === ' ' || e.key ==='Enter'){
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return(
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }
              const items = renderItems(charList),
              errorMessage = error ? <ErrorMessage/>: null,
              spinner = loading && !newItemLoading ? <Spinner/> : null;


        return(
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={()=> onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
        

 }


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;