import React, { Component } from 'react';
import { Button, Input, Textarea } from '../Utils/Utils';
import GamesApiService from './../../services/games-api-service'
import './PostGameForm.css'
import Slider from 'react-rangeslider'


export default class PostGameForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rating: 0,
      error: null
    }
  }

  handleOnChange = (value) => {
    this.setState({
      rating: value
    })
  }

  handleSubmitGame = ev => {
    ev.preventDefault()
    this.setState({ error: null });
    //parse out all of the fields
    const { title,
      description,
      genre,
      rating,
      release_date,
      developer,
      trailer_url,
      image_url_box_art,
      image_url_two,
      image_url_three,
      image_url_four,
      image_url_five } = ev.target;

    GamesApiService.postGame(title, description, genre, rating, release_date, developer, trailer_url, image_url_box_art, image_url_two, image_url_three, image_url_four, image_url_five)
      .then(res => {
        //Figure out what you want to do with the response
        // user_name.value = "";
        // password.value = "";
        // TokenService.saveAuthToken(res.authToken);
        // this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    let { rating } = this.state;
    return (
      <form
        className=''
        onSubmit={this.handleSubmitGame}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='title'>
          <label htmlFor='PostGameForm_title'>
            Title
          </label>
          <Input required name='title' id='PostGameForm_title'></Input>
        </div>

        <div className='description'>
          <label htmlFor='PostGameForm_description'>
            description
          </label>
          <Textarea required name='description' id='PostGameForm_description'></Textarea>
        </div>

        <div className='genre'>
          <label htmlFor='PostGameForm_genre'>Genre</label>
          <select required id='PostGameForm_genre' name='genre'>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Simulation">Simulation</option>
            <option value="Strategy">Strategy</option>
            <option value="RPG">RPG</option>
            <option value="Sports">Sports</option>
            <option value="Horror">Horror</option>
            <option value="FPS">FPS</option>
            <option value="Third Person">Third Person</option>
            <option value="Point And Click">Point And Click</option>
            <option value="Mystery">Mystery</option>
            <option value="RTS">RTS</option>
            <option value="Puzzle">Puzzle</option>
          </select>
        </div>

        {/* Note: Make it only numbers */}
        <div className='rating'>
          <label htmlFor='PostGameForm_rating'>
            rating
          </label>
          <Slider className="slider" value={rating} min={0} max={10} orientation="horizontal" onChange={this.handleOnChange} name='rating' id='PostGameForm_rating' />
        </div>

        {/* Note: Figure out a way to make it take from calendar or something */}
        <div className='release_date'>
          <label htmlFor='PostGameForm_release_date'>
            release date
          </label>
          <Input required name='release_date' id='PostGameForm_release_date'></Input>
        </div>

        <div className='developer'>
          <label htmlFor='PostGameForm_developer'>
            developer
          </label>
          <Input required name='developer' id='PostGameForm_developer'></Input>
        </div>

        <div className='trailer_url'>
          <label htmlFor='PostGameForm_trailer_url'>
            trailer youtube url
          </label>
          <Input required name='trailer_url' id='PostGameForm_trailer_url'></Input>
        </div>

        {/*  */}
        <div className='image_url_box_art'>
          <label htmlFor='PostGameForm_image_url_box_art'>
            cover art
          </label>
          <Input required name='image_url_box_art' id='PostGameForm_image_url_box_art'></Input>
        </div>

        <div className='image_url_two'>
          <label htmlFor='PostGameForm_image_url_two'>
            screen shot 1
          </label>
          <Input required name='image_url_two' id='PostGameForm_image_url_two'></Input>
        </div>

        <div className='image_url_three'>
          <label htmlFor='PostGameForm_image_url_three'>
            screen shot 2
          </label>
          <Input required name='image_url_three' id='PostGameForm_image_url_three'></Input>
        </div>

        <div className='image_url_four'>
          <label htmlFor='PostGameForm_image_url_four'>
            screen shot 3
          </label>
          <Input required name='image_url_four' id='PostGameForm_image_url_four'></Input>
        </div>

        <div className='image_url_five'>
          <label htmlFor='PostGameForm_image_url_five'>
            screen shot 4
          </label>
          <Input required name='image_url_five' id='PostGameForm_image_url_five'></Input>
        </div>

        <Button type='submit'>
          Submit Game
        </Button>
      </form>
    )
  }
}
