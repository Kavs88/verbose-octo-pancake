'use strict';

/**
 * business controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::business.business', ({ strapi }) => ({
  // Simple findOne method
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      
      // Use the default findOne with basic population
      const entity = await strapi.entityService.findOne('api::business.business', id, {
        populate: '*'
      });
      
      if (!entity) {
        return ctx.notFound('Business not found');
      }
      
      return { data: entity };
    } catch (error) {
      console.error('Business findOne error:', error);
      return ctx.internalServerError('Internal server error');
    }
  }
}));