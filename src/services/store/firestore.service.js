
import { db } from '@/db';

// action types
export const GET_READ_LIST = "getReadList";
export const SAVE_READ = "saveRead";
export const EDIT_READ = "editRead";
export const DELETE_READ = "deleteRead";
const collectionName = "lectura-sensores"

const actions = {
  async [GET_READ_LIST]() {
    //context
    try {
        return await db.collection(collectionName).get().docs();
    } catch (response) {
      // eslint-disable-next-line no-console
      console.log({ ...response });
    }
  },
  async [SAVE_READ](context, info) {
    //context
    try {
        return await db.collection(collectionName).add(info);
    } catch (response ) {
        // eslint-disable-next-line no-console
        console.log({ ...response });
    }
  },
  async [EDIT_READ](context, info) {
    //context;
    try {
        return await db
        .collection(collectionName)
        .doc(info.id)
        .set(info);
    } catch (response) {
      // eslint-disable-next-line no-console
      console.log({ ...response });
    }
  },
  async [DELETE_READ](context, infoId) {
    //context;
    try {
        return await db.collection(collectionName).doc(infoId).delete();
    } catch (response) {
      // eslint-disable-next-line no-console
      console.log({ ...response });
    }
  }
};

export default {
  actions
};


  