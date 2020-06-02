import axios from "axios";
import { Request, Response } from "express";

// const {Router} = require('express');
// const axios = require('axios');
// module.exports = (router = new Router()) => {
//   router.get('/hugo', async (req, res) => {
//     const { data: userData } = await axios.get(
//       'https://api.github.com/users/HugoDF'
//     );
//     const {
//       blog,
//       location,
//       bio,
//       public_repos,
//     } = userData
//     return res.json({
//       blog,
//       location,
//       bio,
//       publicRepos: public_repos,
//     });
//   });
//   return router;
// };

export class Routes {
  public routes(app: any): void {
    app.route("/:githubId").get(async (req: Request, res: Response) => {
      const { githubId } = req.params;
      res.header("Content-Type", "application/json");
      const { data: userData } = await axios.get(
        `https://api.github.com/users/${githubId}`
      );
      // debugger;
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { blog, location, bio, public_repos } = userData;
      return res.json({
        blog,
        location,
        bio,
        // eslint-disable-next-line @typescript-eslint/camelcase
        publicRepos: public_repos
      });
    });
  }
}
