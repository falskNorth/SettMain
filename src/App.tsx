import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { MainMenu } from "./components/MainMenu";
import { AboutPage } from "./components/AboutPage";
import { RecruitersPage } from "./components/RecruitersPage";
import { ClipsPage } from "./components/ClipsPage";
import { ProjectsPage } from "./components/ProjectsPage";

type Page = "loading" | "menu" | "about" | "recruiters" | "clips" | "projects";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("loading");

  const handleLoadComplete = () => {
    setCurrentPage("menu");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBack = () => {
    setCurrentPage("menu");
  };

  return (
    <>
      {currentPage === "loading" && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}
      {currentPage === "menu" && (
        <MainMenu onNavigate={handleNavigate} />
      )}
      {currentPage === "about" && (
        <AboutPage onBack={handleBack} />
      )}
      {currentPage === "recruiters" && (
        <RecruitersPage onBack={handleBack} />
      )}
      {currentPage === "clips" && (
        <ClipsPage onBack={handleBack} />
      )}
      {currentPage === "projects" && (
        <ProjectsPage onBack={handleBack} />
      )}
    </>
  );
}
