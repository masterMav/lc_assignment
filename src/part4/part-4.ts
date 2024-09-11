import { scenarios } from './part-4.utils';

/**
 * @classdesc PricingEngineRunner
 * Responsibile for running test scenarios for a given PricingEngine.
 * Note: No Action Required. Provided for testing purposes only.
 */
class PricingEngineRunner {
  constructor() {}

  async runTests(pricingEngine: any) {
    scenarios.forEach(async (scenario) => {
      const result = await pricingEngine.getLowestPrice(
        scenario.timeout,
        scenario.providers
      );

      if (!result && scenario.result != null) {
        console.log(`TEST FAILED [#${scenario.id}]: Got no result`);
      } else if (
        result &&
        (result.provider.id != scenario.result.provider.id ||
          result.price != scenario.result.price)
      ) {
        const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
        const got = `${result.provider.name} at \$${result.price}`;
        console.log(
          `TEST FAILED [#${scenario.id}]: Expected ${expected}, got ${got}`
        );
      } else if (result === null && scenario.result === null) {
        console.log(`SUCCESS [#${scenario.id}]: Got no result as expected`);
      } else {
        const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
        console.log(`SUCCESS [#${scenario.id}]: Got expected ${expected}`);
      }
    });
  }
}

interface PriceResult {
  price: {
    price: number;
  };
  provider: {
    id: number;
    name: string;
  };
}

// Define the type for the result of each promise
type PromiseResult = PriceResult | null;

/**
 * Implement the method 'getLowestPrice' in class 'PricingEngine' that is responsible for receiving prices
 * from multiple other provider classes.
 *
 * There will be multiple scenarios that will run, each one with an expected result.
 *
 * The timeout is the main determines for providers to compete and if unable to send price within the
 * given time, the result may change.
 *
 * It can be either an object containing a provider and a price, or null, if no result returned in time.
 *
 */
class PricingEngine {
  /**
   * TODO: Implement this method that has a maximum timeout, and a list of
   * provider instances as parameters, each of which you can call getPrice() on, to return a price. This method
   * is asynchronous and will return in a specific time with either an object, or a null value.
   *
   *  The Initial state of the test result will be:
   *
   *  TEST FAILED [#1]: Got no result
   *  TEST FAILED [#2]: Got no result
   *  TEST FAILED [#3]: Got no result
   *  TEST FAILED [#5]: Got no result
   *  TEST FAILED [#6]: Got no result
   *  (node:9) UnhandledPromiseRejectionWarning: TypeError: Cannot read properties of null (reading 'provider')
   *
   *  After completing the task, the expected output should be:
   *
   *  SUCCESS [#3]: Got expected Provider 3 at $200
   *  SUCCESS [#4]: Got no result as expected
   *  SUCCESS [#5]: Got expected Provider 1 at $250
   *  SUCCESS [#6]: Got expected Provider 3 at $325
   *  SUCCESS [#2]: Got expected Provider 1 at $300
   *  SUCCESS [#1]: Got expected Provider 2 at $250
   *
   */

  /**
   *  Delay Promise with Timeout
   */

  _getMinValidProvider(validProviders: any) {
    return validProviders.length
      ? validProviders.reduce((min: any, provider: any) => {
          return provider.price < min.price ? provider : min;
        })
      : null;
  }

  async _getPriceWithinTimeLimit(timeout: number, provider: any) {
    const timeoutPromise = new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(null); // Resolve with null after timeout
      }, timeout);
    });

    const getPricePromise = provider.getPrice();

    // If the provider gives price within timeout then take that or else return null.
    return Promise.race([getPricePromise, timeoutPromise]);
  }

  async _getProviderPrices(timeout: number, providers: any) {
    await Promise.allSettled(
      providers.map(async (provider: any) => {
        const data = await this._getPriceWithinTimeLimit(timeout, provider);
        provider.price = data ? data.price : null;
      })
    );
  }

  async getLowestPrice(timeout: number, providers: any) {
    /**
     * TODO: Your body goes here.
     *
     * NOTE: the setTimeout inside Promise is redundant & will not be needed in production,
     * only added here for demonstration purposes.
     */

    const result = await new Promise<any>((resolve) => {
      setTimeout(async () => {
        // 1. Get prices for all providers in parallel within Time Limit.
        await this._getProviderPrices(timeout, providers);

        // 2. Discard invalid prices
        const validProviders = providers.filter((provider: any) => {
          return (
            provider.price !== null &&
            provider.price >= 0 &&
            !provider.throwError
          );
        });

        // 3. Get minimum
        const minProvider = this._getMinValidProvider(validProviders);

        resolve(minProvider);
      }, timeout);
    });

    return result;
  }
}

const pricingEngineRunner = new PricingEngineRunner();

/**
 * Note: No Action is Required, for testing purposes only.
 */
async function run() {
  const pricingEngine = new PricingEngine();
  await pricingEngineRunner.runTests(pricingEngine);
}

run();
