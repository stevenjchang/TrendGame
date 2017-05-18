import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Layout from './components/Layout';
import formatQuery from './../../utilities/formatQuery.js';
import { HashHistory as Router, Route } from 'react-router-dom';


render(
  <App/>
  
  , document.getElementById('app')
);

