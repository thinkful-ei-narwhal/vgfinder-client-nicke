import React, { Component } from 'react';
import { Button, Input, Textarea } from '../Utils/Utils';
import './PostGameForm.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import GamesApiService from './../../services/games-api-service'

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
    <form className="DayPicker-Caption">
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
    </form>
  );
}

export default class PostGameForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.state = {
      rating: 0,
      month: toMonth,
      selectedDay: null,
      error: null
    }
    this.handleDayClick = this.handleDayClick.bind(this);
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

    console.log('TESTING', title.value);
    console.log('TESTING', description.value);
    console.log('TESTING', genre.value);
    console.log('TESTING', this.state.rating);

    console.log('I"M CHANGING', this.state.selectedDay);
    console.log('TESTING', developer.value);
    console.log('TESTING', trailer_url.value);
    console.log('TESTING', image_url_box_art.value);
    // description.value,
    // genre.value,
    // rating.value,
    // release_date.value,
    // developer.value,
    // trailer_url.value,
    // image_url_box_art.value,
    // image_url_two.value,
    // image_url_three.value,
    // image_url_four.value,
    // image_url_five.value);

    GamesApiService.postGame(title.value, description.value, genre.value,
      this.state.rating, this.state.selectedDay, developer.value,
      trailer_url.value, image_url_box_art.value, image_url_two.value,
      image_url_three.value, image_url_four.value, image_url_five.value)
      .then(res => {
        console.log('TESTING', res);
        console.log('TESTING', res.status);
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
      <form className='' onSubmit={this.handleSubmitGame}>
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

        <div className='rating'>
          <label htmlFor='PostGameForm_rating'>
            rating
          </label>
          <Slider className="slider" value={rating} min={0} max={10} orientation="horizontal" onChange={this.handleRatingOnChange} name='rating' id='PostGameForm_rating' />
        </div>

        {/* Note: Figure out a way to make it take from calendar or something */}
        <div className="YearNavigation release_date">
          <label htmlFor='PostGameForm_release_date'>
            release date
          </label>
          <br />
          <DayPicker name='release_date' id='PostGameForm_release_date'
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            // month={this.state.month}
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
          <Input name='image_url_two' id='PostGameForm_image_url_two'></Input>
        </div>

        <div className='image_url_three'>
          <label htmlFor='PostGameForm_image_url_three'>
            screen shot 2
          </label>
          <Input name='image_url_three' id='PostGameForm_image_url_three'></Input>
        </div>

        <div className='image_url_four'>
          <label htmlFor='PostGameForm_image_url_four'>
            screen shot 3
          </label>
          <Input name='image_url_four' id='PostGameForm_image_url_four'></Input>
        </div>

        <div className='image_url_five'>
          <label htmlFor='PostGameForm_image_url_five'>
            screen shot 4
          </label>
          <Input name='image_url_five' id='PostGameForm_image_url_five'></Input>
        </div>

        <Button type='submit'>
          Submit Game
        </Button>
      </form>
    )
  }
}
