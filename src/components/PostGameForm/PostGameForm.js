import React, { Component } from 'react';
import { Button, Input, Textarea } from '../Utils/Utils';
import './PostGameForm.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import GamesApiService from './../../services/games-api-service'
import Alert from './../Alert/Alert'
import GamesListContext from '../../contexts/GamesListContext';


const currentYear = new Date().getFullYear();
const fromMonth = new Date(1970, 11);
const toMonth = new Date(currentYear, 0);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default class PostGameForm extends Component {
  static contextType = GamesListContext;

  constructor(props, context) {
    super(props, context);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.state = {
      rating: 0,
      month: toMonth,
      selectedDay: null,
      error: null
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleErrorClick = () => {
    this.setState({ error: null });
  }

  handleYearMonthChange(month) {
    this.setState({ month });
  }

  handleDayClick(day) {
    this.setState({
      selectedDay: day,
    });
  }

  handleRatingOnChange = (value) => {
    this.setState({
      rating: value
    })
  }

  handleSubmitGame = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    //parse out all of the fields
    const { title,
      description,
      genre,
      developer,
      trailer_url,
      image_url_box_art,
      image_url_two,
      image_url_three,
      image_url_four,
      image_url_five } = ev.target;

    const caseCheck = title.value.toLowerCase();
    if (this.context.gamesList.find(game => game.title.toLowerCase() === caseCheck)) {
      this.setState({ error: "Database already contains this game title" })
      return;
    }

    if (this.state.rating < 1) {
      this.setState({ error: "Give the game a rating" })
      return;
    }

    if (!this.state.selectedDay) {
      this.setState({ error: "Supply a release date" })
      return;
    }

    //youtube parsing
    if (!trailer_url.value.includes("youtube") && !trailer_url.value.includes("watch?v=") && !trailer_url.value.includes("&ab_channel=")) {
      this.setState({ error: "Supply a youtube url" })
      return;
    }

    //url parsing for image
    if (!image_url_box_art.value.includes(".com")) {
      this.setState({ error: "Supply a url for the box art!" })
      return;
    }

    if (image_url_two.value && !image_url_two.value.includes(".com")) {
      this.setState({ error: "Supply a url image for screenshot 1" })
      return;
    }
    if (image_url_three.value && !image_url_three.value.includes(".com")) {
      this.setState({ error: "Supply a url image for screenshot 2" })
      return;
    }
    if (image_url_four.value && !image_url_four.value.includes(".com")) {
      this.setState({ error: "Supply a url image for screenshot 3" })
      return;
    }
    if (image_url_five.value && !image_url_five.value.includes(".com")) {
      this.setState({ error: "Supply a url image for screenshot 4" })
      return;
    }

    GamesApiService.postGame(title.value, description.value, genre.value,
      this.state.rating, this.state.selectedDay, developer.value,
      trailer_url.value, image_url_box_art.value, image_url_two.value,
      image_url_three.value, image_url_four.value, image_url_five.value)
      .then(res => {
        //flush and reset state
        this.gameTitle.value = '';
        this.gameDesc.value = '';
        this.gameDev.value = '';
        this.gameTrailer.value = '';
        this.gameArt.value = '';
        this.gameScreenShot2.value = '';
        this.gameScreenShot3.value = '';
        this.gameScreenShot4.value = '';
        this.gameScreenShot5.value = '';
        this.setState({
          rating: 0,
          month: toMonth,
          selectedDay: null,
          error: "Your game has been posted!"
        })


        const updatedgamesList = this.context.gamesList;
        updatedgamesList.push(res);
        this.context.setGamesList(updatedgamesList);
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  render() {
    const { error } = this.state;
    let { rating } = this.state;

    return (
      <form className='' onSubmit={this.handleSubmitGame}>
        <div role='alert'>
          {error && <Alert message={error} handleErrorClick={this.handleErrorClick} />}
        </div>
        <div className='title'>
          <label htmlFor='PostGameForm_title'>
            Title
          </label>
          <input required name='title' id='PostGameForm_title' ref={el => this.gameTitle = el} ></input>
        </div>

        <div className='description'>
          <label htmlFor='PostGameForm_description'>
            Description
          </label>
          <textarea required name='description' id='PostGameForm_description' ref={el => this.gameDesc = el}></textarea>
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

        <div className='rating'>
          <label htmlFor='PostGameForm_rating'>
            Rating
          </label>
          <Slider className="slider" value={rating} min={0} max={10} orientation="horizontal" onChange={this.handleRatingOnChange} name='rating' id='PostGameForm_rating' />
        </div>

        <div className="YearNavigation release_date">
          <label htmlFor='PostGameForm_release_date'>
            Release Date
          </label>
          <br />
          <DayPicker name='release_date' id='PostGameForm_release_date'
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            fromMonth={fromMonth}
            toMonth={toMonth}
            captionElement={({ date, localeUtils }) => (
              <YearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleYearMonthChange}
              />
            )}
          />
        </div>

        <div className='developer'>
          <label htmlFor='PostGameForm_developer'>
            Developer
          </label>
          <input required name='developer' id='PostGameForm_developer' ref={el => this.gameDev = el}></input>
        </div>

        <div className='trailer_url'>
          <label htmlFor='PostGameForm_trailer_url'>
            Trailer Youtube Url
          </label>
          <input required name='trailer_url' id='PostGameForm_trailer_url' ref={el => this.gameTrailer = el}></input>
        </div>

        <div className='image_url_box_art'>
          <label htmlFor='PostGameForm_image_url_box_art'>
            Cover Art
          </label>
          <input required name='image_url_box_art' id='PostGameForm_image_url_box_art' ref={el => this.gameArt = el}></input>
        </div>

        <div className='image_url_two'>
          <label htmlFor='PostGameForm_image_url_two'>
            Screen Shot 1
          </label>
          <input name='image_url_two' id='PostGameForm_image_url_two' ref={el => this.gameScreenShot2 = el}></input>
        </div>

        <div className='image_url_three'>
          <label htmlFor='PostGameForm_image_url_three'>
            Screen Shot 2
          </label>
          <input name='image_url_three' id='PostGameForm_image_url_three' ref={el => this.gameScreenShot3 = el}></input>
        </div>

        <div className='image_url_four'>
          <label htmlFor='PostGameForm_image_url_four'>
            Screen Shot 3
          </label>
          <input name='image_url_four' id='PostGameForm_image_url_four' ref={el => this.gameScreenShot4 = el}></input>
        </div>

        <div className='image_url_five'>
          <label htmlFor='PostGameForm_image_url_five'>
            Screen Shot 4
          </label>
          <input name='image_url_five' id='PostGameForm_image_url_five' ref={el => this.gameScreenShot5 = el}></input>
        </div>

        <button type='submit'>
          Submit Game
        </button>
      </form>
    )
  }
}
