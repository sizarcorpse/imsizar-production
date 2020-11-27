// import React, { useState, useEffect } from "react";
// import app from "../../firebase";

// export default function UseDemoHook({ review }) {
//   const [reviewComments, setReviewComments] = useState([]);

//   // #handlers : get call comment
//   useEffect(() => {
//     getReviewComments();
//     console.log("collected blogsComments");
//   }, []);

//   const getReviewComments = async () => {
//     let db = app.firestore();
//     await db
//       .collection("reviewComments")
//       .where("reviewID", "==", `${review.reviewID}`)
//       .onSnapshot(
//         (querySnapshot) => {
//           let items = [];
//           querySnapshot.forEach((doc) => {
//             items.push(doc.data());
//           });
//           setReviewComments(items);
//           setLoading(false);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   };

//   return reviewComments;
// }
