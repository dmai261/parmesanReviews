import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Header from '../client/src/components/Header.jsx';
import Mentions from '../client/src/components/Mentions.jsx';
import Review from '../client/src/components/Review.jsx';
import TopReviews from '../client/src/components/TopReviews.jsx';

const jest = require('jest-mock');
const helpers = require('../server/helpers/helpers');

configure({ adapter: new Adapter() });

describe('tests', () => {
  test('expect 1 to equal 1', () => {
    const sum = 1;
    expect(sum).toBe(1);
  });
});

describe('helpers', () => {
  test('expect getRandomInt to be a function', () => {
    expect(typeof helpers.getRandomInt).toBe('function');
  });

  test('expect getRandomInt to generate random data', () => {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += helpers.getRandomInt(10);
    }
    result = result / 10000;
    expect(result).toBeGreaterThan(4);
    expect(result).toBeLessThan(6);
  });
});

describe('database', () => {
  // TBD test('expect db to have property initAndSeed', () => {
  //   expect(db.hasOwnProperty('initAndSeed')).toBe(true);
  // });
});

describe('server', () => {
  // TBD
});

const getFakeState = () => {
  return {
    reviews: [],
    currentProductId: 1,
  };
};

const fakeReview = {
  "_id": "5b918722d4a71c1897abb02f", "productId": 37, "reviewId": 368, "username": "Parker_Nader66", "stars": 1, "title": "est dolore ducimus", "text": "Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.", "timestamp": "2018-02-01T17:26:28.993Z", "numHelpful": 965, "verifiedPurchase": true, "imageUrl": "http://lorempixel.com/640/480", "__v": 0,
}

const fakeRenderStarRating = () => {
  return null;
};

describe('App', () => {
  test('it renders without crashing', () => {
    shallow(<App />);
  });

  test('it has method renderStarRating', () => {
    const wrapper = shallow(<App />);
    expect(typeof wrapper.instance().renderStarRating).toBe('function');
  });

  test('it has method getState', () => {
    const wrapper = shallow(<App />);
    expect(typeof wrapper.instance().getState).toBe('function');
  });

  test('renderStarRating returns an object', () => {
    const wrapper = shallow(<App />);
    expect(typeof wrapper.instance().renderStarRating(4, 3)).toBe('object');
  });
});

describe('Header', () => {
  test('it renders without crashing', () => {
    shallow(<Header renderStarRating={fakeRenderStarRating} getState={getFakeState} />);
  });

  test('it has method renderRatingHistogram', () => {
    const wrapper = shallow(<Header renderStarRating={fakeRenderStarRating} getState={getFakeState} />);
    expect(typeof wrapper.instance().renderRatingHistogram).toBe('function');
  });

  test('renderRatingHistogram should be called during render', () => {
    const spy = jest.spyOn(Header.prototype, 'renderRatingHistogram');
    const wrapper = shallow(<Header renderStarRating={fakeRenderStarRating} getState={getFakeState} />);
    wrapper.instance().render();
    expect(spy).toHaveBeenCalled();
  });
});

describe('Mentions', () => {
  test('it renders without crashing', () => {
    shallow(<Mentions getState={getFakeState} />);
  });
});

describe('Review', () => {
  test('it renders without crashing', () => {
    shallow(<Review review={fakeReview} renderStarRating={fakeRenderStarRating} getState={getFakeState} />);
  });
});

describe('TopReviews', () => {
  test('it renders without crashing', () => {
    shallow(<TopReviews getState={getFakeState} />);
  });
});