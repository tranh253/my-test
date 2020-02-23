/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import logo from './image/cat.png'
import './App.css';

const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 160px 50px auto 70px;
    width: 100%;
    background-color:  #DDAD86;
`

const StyleButton = styled.button`
  display: grid; 
  background-color: #DDAD86;
  border: none;
  cursor: pointer;
  grid-column: 4/5;
  justify-self: center;
`
const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TaggedFact = styled.div`
    display: flex;
    padding: 25px 10px;
    background-color:${props => props.loading ? "#fff" : "#FBEEC1"};
    border-radius: 30px;
    margin-top: 20px;
    width: 90%;
    font-family: 'Comic Sans MS';
    font-style: 'italic';
`
const ContentWrapper = styled.div`
  background-color: #C5AFA0;
  width: 100%;
  height: auto;
`
const ConsoleLogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default function CatAPI() {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://cat-fact.herokuapp.com/facts'
  let indexArray = []
  let catArray = []
  const [cat, setCat] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    setError(false)
    //set loading before API operation starts
    setLoading(true)
    try {
      const response = await fetch(proxyUrl + targetUrl);
      const json = await response.json();
      //Create a random 5 numbers list 
      while (indexArray.length < 5) {
        var r = Math.floor(Math.random() * json.all.length);
        if (indexArray.indexOf(r) === -1) indexArray.push(r);
        console.log(indexArray)
      }
      //Get a cat fact with a following index in number list 
      for (var x = 0; x < indexArray.length; x++) {
        catArray.push(json.all[indexArray[x]])
      }
      setLoading(false)
      return catArray
    } catch (error) {
      setError(true)
      throw error;
    }

  }
  const ConsoleLog = ({ children }) => {
    console.log(children)
    return (
      <ConsoleLogWrapper>
        <FontAwesomeIcon style={{ paddingRight: 20 }} icon={faExclamationTriangle} size="md" />
        <p style={{ fontSize: 20, fontFamily: 'Comic Sans MS', fontStyle: 'italic' }}>Something wrong during the fetching process {error.message}</p>
        <FontAwesomeIcon style={{ paddingLeft: 20 }} icon={faExclamationTriangle} size="md" />
      </ConsoleLogWrapper>
    )
  }
  const refreshData = () => {
    fetchData()
      //Set data for cat
      .then(setCat)
      .catch(error => {
        console.warn(error);
      });
  }
  useEffect(() => {
    fetchData()
      //Set data for cat
      .then(setCat)
      .catch(error => {
        console.warn(error);
      });


  }, [])
  console.log(cat)

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <h2 style={{ fontSize: 28, fontFamily: 'Comic Sans MS', fontStyle: 'italic', marginLeft: 20, display: 'grid' }}>Cat Facts</h2>

        <img src={logo} alt="Logo" style={{ width: 45, height: 45, alignSelf: 'center', justifySelf: 'end' }} />
        <StyleButton onClick={refreshData}>
          <FontAwesomeIcon icon={faSyncAlt} size="3x" />
        </StyleButton>
      </HeaderWrapper>
      <BodyWrapper>
        {/* Loading Section */}
        {
          loading &&
          <Loader type="TailSpin" color="#000" height={80} width={80} />
        }

        {/* Content Section */}
        {cat && !loading && cat.map(item => {
          return (
            <TaggedFact key={item._id} loading={loading}>
              <ul>
                <li>
                  <p>{item.text}</p>
                </li>
              </ul>
            </TaggedFact>
          )
        })
        }
        {/* Error Section */}
        {
          error && <ConsoleLog />
        }


      </BodyWrapper>
    </ContentWrapper>
  );
}


