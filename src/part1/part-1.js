/**
 * Refer to the following data when completing your answers: (The following JSON
 * file contains providers available for an industry)
 */

const PROVIDERS = require('../shared/data.json');

function _validateNum(num) {
  return num && typeof num === 'number' && num >= 0;
}

function _getValidPremiums(provider) {
  return (
    provider.prices?.map((price) => price.premium).filter(_validateNum) || []
  );
}

function _getIndustryProviders(industryName) {
  return PROVIDERS.filter((provider) => provider.industry === industryName);
}

/**
 * Create a query that returns total premiums and fees available for retail industry
 */
function task1() {
  /**
   * TODO: Your body goes here
   */
  /**
   * Please note that reduce can also be used here instead of forEach,
   * but the current code is much more readable & easy to re-structure as compared to reduce.
   */
  const result = [
    {
      totalPremium: 0,
      totalFees: 0,
    },
  ];

  const retailProviders = _getIndustryProviders('retail');

  retailProviders.forEach((provider) => {
    provider.prices?.forEach((price) => {
      if (_validateNum(price.premium)) result[0].totalPremium += price.premium;
      if (_validateNum(price.fee)) result[0].totalFees += price.fee;
    });
  });

  return result;
}

/**
 * Create a query that returns the minimum premium available among the providers for technology industry
 */
function task2() {
  /**
   * TODO: Your body goes here
   */
  const result = [];

  const techProviders = _getIndustryProviders('technology');
  const premiums = techProviders.flatMap(_getValidPremiums);

  result.push({ totalPremium: Math.min(...premiums) });

  return result;
}

/**
 * Create a query that returns all the provider names available for the technology industry
 * that has a premium amount greater than or equal to 1000
 */
function task3() {
  /**
   * TODO: Your body goes here
   */
  const techProviders = PROVIDERS.filter((provider) => {
    if (provider.industry !== 'technology') return false;

    const premiums = _getValidPremiums(provider);
    const maxPremium = Math.max(...premiums);
    return maxPremium >= 1000;
  });

  const result = techProviders.map((provider) => provider.name);

  return result;
}

/**
 * Create a query that returns  provider's name and industry who has the highest premium price
 */

function task4() {
  /**
   * TODO: Your body goes here
   */
  const result = [];

  const allPremiums = PROVIDERS.flatMap(_getValidPremiums);
  const highestPremium = Math.max(...allPremiums);

  PROVIDERS.forEach((provider) => {
    if (provider.prices?.some((price) => price.premium === highestPremium))
      result.push({ name: provider.name, industry: provider.industry });
  });

  return result;
}

/**
 * To see the expected results, please refer to ./expected-data.json file in part1 directory!
 * NOTE: Please ensure that all the tests in part-1.spec.js are passing!
 */

module.exports = {
  task1,
  task2,
  task3,
  task4,
  _validateNum,
};
