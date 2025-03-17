/**
 * Interface representing a project always use it and refer to it when adding or editing a project.
 */
export interface ProjectInterface {
  /**
   * The width of the project card. Can be 4, 8, or 12.
   */
  width: 4 | 6 | 8 | 12;
  /**
   * The height of the project card. Can be 6 or 12.
   */
  height: 6 | 12;
  /**
   * The title of the project.
   */
  title: string;
  /**
   * A brief description of the project.
   */
  description: string;
  /**
   * A URL link to the project.
   */
  link?
  : string;
  /**
   * The image of the project.
   */
  image: string;
}

/**
 * Function to generate a link based on the project title.
 * @param title The title of the project.
 * @returns The generated link.
 */
function generateLink(title: string): string {
  return `${title.toLowerCase().replace(/\s+/g, '-')}`;
}

const projectData: ProjectInterface[] = [
  {
    width: 4,
    height: 6,
    title: "Project One",
    description: "Description for project one.",
    image: "https://picsum.photos/1000/800?random=1",
  },
  {
    width: 8,
    height: 12,
    title: "Project Two",
    description: "Description for project two.",
    image: "https://picsum.photos/1000/800?random=2",
  },
  {
    width: 4,
    height: 6,
    title: "Project Three",
    description: "Description for project three.",
    image: "https://picsum.photos/1000/800?random=3",
  },
  {
    width: 6,
    height: 6,
    title: "Project Four",
    description: "Description for project four.",
    image: "https://picsum.photos/1000/800?random=4",
  },
  {
    width: 6,
    height: 12,
    title: "Project Five",
    description: "Description for project five.",
    image: "https://picsum.photos/1000/800?random=5",
  },
  {
    width: 6,
    height: 6,
    title: "Project Six",
    description: "Description for project six.",
    image: "https://picsum.photos/1000/800?random=6",
  },
];

export const projects: ProjectInterface[] = projectData.map(project => ({
  ...project,
  link: generateLink(project.title),
}));