/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import challengeUtils = require('../lib/challengeUtils')
import { type Request, type Response, type NextFunction } from 'express'
import { type Review } from '../data/types'
import * as db from '../data/mongodb'
import { challenges } from '../data/datacache'

const security = require('../lib/insecurity')

module.exports = function productReviews () {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id
    const user = security.authenticatedUsers.from(req)
    db.reviewsCollection.findOne({ _id: id }).then((review: Review) => {
      if (!review) {
        res.status(404).json({ error: 'Not found' })
      }
    }, () => {
      res.status(400).json({ error: 'Wrong Params' })
    })
  }
}
