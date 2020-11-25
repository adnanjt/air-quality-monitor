import { db } from "@/db";

// action types
export const GET_READ_LIST = "getReadList";
export const SAVE_READ = "saveRead";
export const EDIT_READ = "editRead";
export const DELETE_READ = "deleteRead";
const collectionName = "lectura-sensores";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const actions = {
  async [GET_READ_LIST]() {
    //context
    try {
      //return await db.collection(collectionName).docs().get();
      let result = [];
      await db
        .collection(collectionName)
        .orderBy("tiempo", "asc")
        .get()
        .then(function(querySnapshot) {
          let count = 0;
          //console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            //console.log(doc);
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", );
            let document = doc.data();
            document.muestra = count;
            count++;
            //console.log(document);
            result.push(document);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      return result;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(err.message));
    }
  },
  async [SAVE_READ](context, info) {
    //context
    try {
      return await db.collection(collectionName).add(info);
    } catch (response) {
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
  async [DELETE_READ](context) {
    context;

    try {
      let result = [];
      await db
        .collection(collectionName)
        .get()
        .then(function(querySnapshot) {
          //console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            result.push(doc);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

      asyncForEach(result, doc => {
        db.collection(collectionName)
          .doc(doc.id)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      });
    } catch (response) {
      // eslint-disable-next-line no-console
      console.log({ ...response });
    }
  }
};

export default {
  actions
};
