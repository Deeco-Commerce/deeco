import type { Request, Response } from 'express';
import type { ProductSpecs } from '../schemas/productSchema.zod.js';
import type { StoreSpecs } from '../schemas/storeSchema.zod.js';
import { findStore } from '../lib/findStore.service.js';
import { findAllUserProduct } from '../lib/findAllUserProduct.service.js';

// description: get general user store(store and all products) data, and send back relevant data as response.
// request: GET
// route: '/api/v1/store/get-all-store-data';
// access: Private and Internal

type getAllUserStoreDataResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    storeData: {
      basicStoreInfo: StoreSpecs;
      productCount: number;
      products: ProductSpecs[];
    };
    tokenStatus: string;
    renewedUserAccessToken: string;
  };
};

const getAllUserStoreData = async (req: Request<{}, getAllUserStoreDataResponseSpecs>, res: Response<getAllUserStoreDataResponseSpecs>) => {
  try {
    if (req.user) {
      req.body.createdBy = req.user.userId;
      // check if user has already created a store
      const basicStoreInfo = await findStore(req.user.userId);

      if (!basicStoreInfo) {
        // console.log(store);
        return res.status(404).json({
          error: 'store not found',
          responseMessage: `store not found on this user: please create a store first`
        });
      }

      const allUserProducts = await findAllUserProduct(req.user.userId);
      console.log(allUserProducts);

      if (!allUserProducts) {
        // console.log(store);
        return res.status(404).json({
          error: 'products not fetched',
          responseMessage: `products data for this store could not be fetched`
        });
      }

      // req content from auth middleware
      const { renewedUserAccessToken, renewedUserRefreshToken, tokenStatus } = req.user;

      // update refresh token(cookie)
      res.cookie('DeecoCommerce_SecretRefreshToken', renewedUserRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      return res.status(200).json({
        responseMessage: 'store data fetched successfully',
        response: {
          storeData: {
            basicStoreInfo,
            productCount: allUserProducts.length,
            products: allUserProducts
          },
          tokenStatus,
          renewedUserAccessToken: renewedUserAccessToken
        }
      });
    }

    return;
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        responseMessage: 'store creation failed',
        error: error.message
      });
    } else {
      return res.status(500).json({
        responseMessage: 'store creation unsuccessful: please try again',
        error: error as string
      });
    }
  }
};

export default getAllUserStoreData;