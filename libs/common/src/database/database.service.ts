import { Injectable, Logger } from '@nestjs/common';

import { Generic } from '../models/generic.model';

@Injectable()
export class DatabaseService {
  constructor(private readonly logger: Logger) {}

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public async addItem<T extends Generic>(
    model: any,
    payload: any,
  ): Promise<T> {
    try {
      this.logger.log(
        'DatabaseService.addItem: Adding new item in: ' +
          model.collection.collectionName,
        payload,
      );
      const savedItem = await model.create(payload);
      if (savedItem) {
        this.logger.log(
          'DatabaseService.addItem: Received saved item from: ' +
            model.collection.collectionName,
          savedItem,
        );
        return savedItem;
      }
    } catch (error) {
      this.logger.error(
        'DatabaseService.addItem: Error occured while adding item in: ' +
          model.collection.collectionName,
        error,
      );
    }
    return null;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public async getSingleItem<T extends Generic>(
    model: any,
    query: any,
  ): Promise<T> {
    try {
      this.logger.log(
        'DatabaseService.getSingleItem: getting single item from: ' +
          model.collection.collectionName,
        query,
      );
      const result = await model.find(query);
      if (result) {
        this.logger.log(
          'DatabaseService.getSingleItem: Received query result from: ' +
            model.collection.collectionName,
          result,
        );
        return result;
      }
    } catch (error) {
      this.logger.error(
        'DatabaseService.getSingleItem: Error occured while getting single item in: ' +
          model.collection.collectionName,
        error,
      );
    }
    return null;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public async updateItem<T extends Generic>(
    model: any,
    query: any,
    payload: any,
  ): Promise<T> {
    try {
      this.logger.log(
        'DatabaseService.updateItem: updating single item from: ' +
          model.collection.collectionName,
        query,
      );
      const result = await model.findOneAndUpdate(query, payload, {
        new: true,
      });
      if (result) {
        this.logger.log(
          'DatabaseService.updateItem: Received query result from: ' +
            model.collection.collectionName,
          result,
        );
        return result;
      }
    } catch (error) {
      this.logger.error(
        'DatabaseService.updateItem: Error occured while updating single item in: ' +
          model.collection.collectionName,
        error,
      );
    }
    return null;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public async deleteItem(model: any, query: any): Promise<boolean> {
    try {
      this.logger.log(
        'DatabaseService.deleteItem: deleting single item from: ' +
          model.collection.collectionName,
        query,
      );
      const result = await model.deleteOne(query);
      return result.deletedCount;
    } catch (error) {
      this.logger.error(
        'DatabaseService.deleteItem: Error occured while deleting single item in: ' +
          model.collection.collectionName,
        error,
      );
    }
    return false;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public async isExists(model: any, query: any): Promise<boolean> {
    try {
      this.logger.log(
        'DatabaseService.isExists: checking documents in: ' +
          model.collection.collectionName,
        query,
      );

      const result = await model.exists(query);
      if (result) {
        this.logger.log(
          'DatabaseService.isExists: Received query result from: ' +
            model.collection.collectionName,
          query,
        );
        return true;
      }
    } catch (error) {
      this.logger.error(
        'DatabaseService.isExists: Error occured while checking documents in: ' +
          model.collection.collectionName,
        error,
      );
    }
    return false;
  }
}
