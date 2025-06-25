import AboutPageContent from './AboutPageContent';
import SkillsPageContent from './SkillsPageContent';
import ProjectsPageContent from './ProjectsPageContent';
// ...import other page content components

const FullScrollPortfolio = () => (
  <div className="full-scroll-container">
    <section className="fullpage-section"><AboutPageContent /></section>
    <section className="fullpage-section"><SkillsPageContent /></section>
    <section className="fullpage-section"><ProjectsPageContent /></section>
    {/* ...add other sections in order */}
  </div>
);

export default FullScrollPortfolio;
