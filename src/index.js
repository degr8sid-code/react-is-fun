import React, {Component} from 'react';
import {render} from 'react-dom';

//prop types from correct data types
//you can also modularize the function and class components like Book, Hiring, NotHiring and Library components

/*
let skiData = {
  total: 50,
  backcountry: 40,
  powder: 10,
  goal: 100
}

const getPercent = decimal => {
  return decimal * 100 + '%'
}

const calGoalProgress = (total, goal) => {
  return getPercent(total/goal)
 }

const SkiDayCounter = ({total, backcountry,powder,goal}) => {
  return (
    <section>
      <div>
        <p>Total Days = {total}</p>
      </div>
      <div>
        <p>Backcountry days = {backcountry}</p>
      </div>
      <div>
        <p>Powder Days = {powder}</p>
      </div>
      <div>
        <p>
          Goal = {goal}
        </p>
      </div>
      <div>
          <p>Goal Progress = {calGoalProgress(total,goal)}</p>
        </div>
    </section>
  )
}

class SkiDayCounter extends Component {
  getPercent = decimal => {
    return decimal * 100 + '%'
  }

  calGoalProgress = (total, goal) => {
    return this.getPercent(total/goal)
   }
  render () {
    const {total, backcountry, powder, goal} = this.props
    return (
      <section>
        <div>
          <p>Total Days = {total}</p>
        </div>
        <div>
          <p>Backcountry days = {backcountry}</p>
        </div>
        <div>
          <p>Powder Days = {powder}</p>
        </div>
        <div>
          <p>
            Goal = {goal}
          </p>
        </div>
        <div>
          <p>Goal Progress = {this.calGoalProgress(total,goal)}</p>
        </div>
      </section>
    )
  }

}

render(
 <SkiDayCounter 
 total={skiData.total} 
 backcountry = {skiData.backcountry}
 powder = {skiData.powder}
 goal = {skiData.goal} />,
  document.getElementById('root')
);

*/

//child component made dynamic
let bookList = [
  {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260},
  {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260},
  {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260},
  {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260},
  {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260}
]

//child component
//arrow function with return statement
const Book = ({title="No title", author="No author", pages=0, freeBookmark="No bookmarks"}) => {
  return (
    <section>
    <h2>{title}</h2>
    <p>by: {author}</p>
    <p>Pages: {pages} pages</p>
    <p>Free bookmarks today: {freeBookmark? 'yes' : 'no'} </p>
    </section>
  )
}


//child component but in another way
const Hiring =  () => 
  <div>
    <p>The library hiring.</p>
  </div>
 


const NotHiring = () => 
  <div>
    <p>The Library is not hiring</p>
  </div>

//parent component - a function component
/*const Library = ({books}) => {
  return (
    <div>
      {books.map(
        (book, i) => <Book 
                      key = {i} title={book.title} author= {book.author} pages = {book.pages}/>
      )}
    </div>
  )
}*/

//parent component now ES6component

class Library extends React.Component {

  static defaultProps = {
    books: [
      {"title": "The sun rises", "author": "Ernest Hemmingway", "pages": 260}
    ]
  }
  
  state = {
    open: true,
    freeBookmark: true,
    hiring:false,
    data: [],
    loading:false
}
  //after adding the above line, we dont need constructor
  //constructor
  /*constructor(pros) {
    super(props)
    this.state = {
      open:false
    }
    this.toggleOpenClosed = this.toggleOpenClosed.bind(this)
  }*/

  componentDidMount()  {

    this.setState({loading:true})
    //browser's version of fetch
    fetch('https://hplussport.com/api/products/order/price/sort/asc/1')
    .then(data => data.json)
    .then(data => this.setState({data, loading: false}))
  }

  componentDidUpdate() {

  }
  //the function below is now binded
  toggleOpenClosed = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }
  render () {
    const {books} = this.props
    return (
      <div>
        {this.state.hiring? <Hiring/> : <NotHiring/>}
        {this.state.loading? "loading..." 
        : <div>
          {this.state.data.map(product =>  {
            return (
              <div>
                <h3>Library product of the week</h3>
                <h4>{product.name}</h4>
                <img src = {product.image} height = {100} alt="alt text"/>
                </div> 
            )
          })}
          </div>}
        <h1>The Library is {this.state.open? 'open' : 'closed'}</h1>
      {books.map(
        (book, i) => <Book 
                      key = {i} title={book.title} author= {book.author} pages = {book.pages} freeBookmark = {this.state.freeBookmark}/>
      )}
      
    </div>
    )
  }
}


render (<div>

  <Library />
</div>, 
document.getElementById('root'));