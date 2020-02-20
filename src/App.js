import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from './image/cat.png'
import './App.css';

var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = 'https://cat-fact.herokuapp.com/facts'
let indexArray = []
let catArray = []
const [cat, setCat] = useState([])
useEffect(() => {
  async function fetchData() {
    fetch(proxyUrl + targetUrl)
      .then(
        result => {
          return result.json()
        })
      .then(
        data => {
          while (indexArray.length < 5) {
            var r = Math.floor(Math.random() * data.all.length);
            if (indexArray.indexOf(r) === -1) indexArray.push(r);
          }
          console.log(indexArray)
          for (var x = 0; x < indexArray.length; x++) {
            console.log(data.all[indexArray[x]])
            catArray.push(data.all[indexArray[x]])
          }
          console.log(catArray[0])
        }, [catArray]);
  }
  fetchData()
})

function CatAPI() {
  return (
    <div className="main">
      <p>Test</p>
      {catArray.map(item => {
        return (
          <div>
            <p>{item._id}</p>
            <p>{item.text}</p>
          </div>
        )
      })

      }
    </div>
  );
}
const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: #DDAD86;
`

function Header() {
  return (
    <HeaderWrapper>
      <h2 style={{ marginLeft: 20, fontSize: 28, fontFamily: 'Comic Sans MS', fontStyle: 'italic' }}>Cat Facts</h2>

      <img onClick={this.fetchData()} src={logo} alt="Logo" style={{ width: 45, height: 45, marginTop: 20, marginLeft: 10 }} />

    </HeaderWrapper>
  )
}
const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const TaggedFact = styled.div`
    display: flex;
    padding: 25px 10px;
    background-color: #FBEEC1;
    width: 250px;
    height: 500px;
    border-radius: 30px;
    margin-top: 20px;
`
function Body() {
  return (
    <BodyWrapper>
      <TaggedFact>
        <p>First Tag</p>
        <CatAPI />
      </TaggedFact>
      <TaggedFact>
        <p>Second Tag</p>
      </TaggedFact>
      <TaggedFact>
        <p>Third Tag</p>
      </TaggedFact>
      <TaggedFact>
        <p>Fourth Tag</p>
      </TaggedFact>
      <TaggedFact>
        <p>Fifth Tag</p>
      </TaggedFact>
    </BodyWrapper>
  )
}
class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Body />
      </>
    );
  }
}


export default App;
