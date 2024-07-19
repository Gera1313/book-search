// import { gql } from "@apollo/client";

// export const GET_ME = gql`
//   {
//     me {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;

// Added this file/code

import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;