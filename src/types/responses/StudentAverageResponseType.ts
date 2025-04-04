export type StudentAverageResponseType = {
  name: string;
  average: number;
  links: [
    {
      rel: string;
      href: string;
      type: string;
      template: boolean;
    }
  ];
};
