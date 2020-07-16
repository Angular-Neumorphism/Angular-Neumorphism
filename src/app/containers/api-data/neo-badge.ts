import { DescriptionItem } from '../models/index';

export const BADGE_API: DescriptionItem[] = [
  {
    apiName: '@Input("neoBadgeColor")',
    apiType: `color: string `,
    description: `Apply provided color to a
    checkbox background. Could be HEX, RGB (RGBA) or HTML color`,
  },
  {
    apiName: '@Input("neoBadge)',
    apiType: `content: string`,
    description: `The content for the badge`,
  },
  {
    apiName: '@Input("neoBadgeDescription)',
    apiType: `description: string`,
    description: `Message used to describe the decorated element via aria-describedby`,
  },
  {
    apiName: '@Input("neoBadgeDisabled)',
    apiType: `disabled: boolean`,
    description: `Whether the component is disabled.`,
  },
  {
    apiName: '@Input("neoBadgeHidden)',
    apiType: `hidden: boolean`,
    description: `Whether the badge is hidden.`,
  },
  {
    apiName: '@Input("neoBadgeOverlap)',
    apiType: `overlap: boolean`,
    description: `Whether the badge should overlap its contents or not`,
  },
  {
    apiName: '@Input("neoBadgePosition)',
    apiType: `position: string`,
    description: `Position the badge should reside.Could be 'above after' | 'above before' | 'below before' | 'below after' | 'before' | 'after' | 'above' | 'below';`,
  },
  {
    apiName: '@Input("neoBadgeSize)',
    apiType: `size: string`,
    description: `Size of the badge. Can be 'small', 'medium', or 'large'.`,
  },
];
