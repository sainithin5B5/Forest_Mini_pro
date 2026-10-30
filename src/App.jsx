import React, { useState, useEffect } from 'react';
import SidebarNav from './components/SidebarNav';
import HeroWelcomeStage from './components/HeroWelcomeStage';
import HabitatMapShowcase from './components/HabitatMapShowcase';
import HabitatResidenceInterior from './components/HabitatResidenceInterior';
import EnvironmentOverviewPanel from './components/EnvironmentOverviewPanel';
import EnergyManagementPanel from './components/EnergyManagementPanel';
import CommunityHubSection from './components/CommunityHubSection';
import StratificationExplorer from './components/StratificationExplorer';
import VirtualNursery from './components/VirtualNursery';
import BioluminescentCanvas from './components/BioluminescentCanvas';
import MycelialNetworkModal from './components/MycelialNetworkModal';
import FeatureExplainerModal from './components/FeatureExplainerModal';
import AiAssistantModal from './components/AiAssistantModal';
import ExploreHabitatModal from './components/ExploreHabitatModal';
import ZoneDetailsModal from './components/ZoneDetailsModal';
import SettingsModal from './components/SettingsModal';
import UserProfileModal from './components/UserProfileModal';
import NotificationsModal from './components/NotificationsModal';
import WeatherDetailModal from './components/WeatherDetailModal';
import BiodiversityModal from './components/BiodiversityModal';
import EventDetailModal from './components/EventDetailModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import ReportIssueModal from './components/ReportIssueModal';
import EnergyManagementModal from './components/EnergyManagementModal';

import { useScrollReveal } from './hooks/useScrollReveal';
import { featureDescriptions } from './utils/featureDescriptions';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState('dashboard');
  const [timeOfDay, setTimeOfDay] = useState('night');
  const [sporePoints, setSporePoints] = useState(240);

  // Modal States
  const [isMeshModalOpen, setIsMeshModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isBiodiversityOpen, setIsBiodiversityOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
  const [isEnergyModalOpen, setIsEnergyModalOpen] = useState(false);

  const [activeFeatureExplainer, setActiveFeatureExplainer] = useState(null);

  const [telemetry, setTelemetry] = useState({
    canopyDensity: 94.2,
    oxygenFlux: 128.4,
    soilHydration: 78.6,
    coreTemperature: 21.8,
  });

  // Attach Intersection Observer scroll reveal animations
  useScrollReveal();

  // Fetch telemetry & spore points from SQLite Express API
  useEffect(() => {
    fetch('/api/telemetry')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          setTelemetry({
            canopyDensity: data.current.canopy_density,
            oxygenFlux: data.current.oxygen_flux,
            soilHydration: data.current.soil_hydration,
            coreTemperature: data.current.core_temperature,
          });
        }
      })
      .catch(() => {});

    fetch('/api/spores')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.points === 'number') {
          setSporePoints(data.points);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#050b08] text-slate-100 relative selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Bioluminescent Canvas Particles Overlay */}
      <BioluminescentCanvas timeOfDay={timeOfDay} />

      {/* Floating Sidebar Navigation */}
      <SidebarNav
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenHelp={() => setActiveFeatureExplainer(featureDescriptions.spore_points)}
        onOpenAi={() => setIsAiModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenUserProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Dashboard Layout */}
      <main className="lg:pl-72 p-4 sm:p-6 relative z-10 space-y-6 max-w-[1700px] mx-auto">
        
        {/* Row 1: Hero Welcome Stage (Left) & Habitat Map Showcase (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          
          <div className="xl:col-span-7">
            <HeroWelcomeStage 
              onExplainFeature={(feature) => setActiveFeatureExplainer(feature)} 
              onOpenExploreHabitat={() => setIsExploreModalOpen(true)}
              onOpenWeather={() => setIsWeatherOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
            />
          </div>

          <div className="xl:col-span-5">
            <HabitatMapShowcase 
              onExplainFeature={(feature) => setActiveFeatureExplainer(feature)} 
              onOpenZoneDetails={() => setIsZoneModalOpen(true)}
            />
          </div>

        </div>

        {/* Row 2: Environment Overview (Left 4), Energy Management (Middle 4), Habitat 07 Residence Interior (Right 4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          <div className="md:col-span-4">
            <EnvironmentOverviewPanel 
              telemetry={telemetry} 
              onExplainFeature={(feature) => setActiveFeatureExplainer(feature)} 
              onOpenBiodiversity={() => setIsBiodiversityOpen(true)}
            />
          </div>

          <div className="md:col-span-4">
            <EnergyManagementPanel 
              onExplainFeature={(feature) => setActiveFeatureExplainer(feature)} 
              onOpenEnergyModal={() => setIsEnergyModalOpen(true)}
            />
          </div>

          <div className="md:col-span-4">
            <HabitatResidenceInterior 
              onExplainFeature={(feature) => setActiveFeatureExplainer(feature)} 
              onOpenExploreHabitat={() => setIsExploreModalOpen(true)}
            />
          </div>

        </div>

        {/* Row 3: Community Hub Section */}
        <div className="grid grid-cols-1 gap-6">
          <CommunityHubSection 
            onOpenEventModal={() => setIsEventModalOpen(true)}
            onOpenReportIssue={() => setIsReportIssueOpen(true)}
            onOpenServiceRequest={() => setIsServiceModalOpen(true)}
            onOpenShareUpdate={() => setIsEventModalOpen(true)}
          />
        </div>

        {/* Row 4: 3D Vertical Stratification Canopy Explorer */}
        <div className="pt-4">
          <StratificationExplorer />
        </div>

        {/* Row 5: Adopt-a-Plot Virtual Tree Nursery (SQLite DB connected) */}
        <div className="pt-4">
          <VirtualNursery
            sporePoints={sporePoints}
            setSporePoints={setSporePoints}
          />
        </div>

      </main>

      {/* Modals */}
      <MycelialNetworkModal
        isOpen={isMeshModalOpen}
        onClose={() => setIsMeshModalOpen(false)}
      />

      <FeatureExplainerModal
        feature={activeFeatureExplainer}
        onClose={() => setActiveFeatureExplainer(null)}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <ExploreHabitatModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
      />

      <ZoneDetailsModal
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        sporePoints={sporePoints}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <WeatherDetailModal
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
      />

      <BiodiversityModal
        isOpen={isBiodiversityOpen}
        onClose={() => setIsBiodiversityOpen(false)}
      />

      <EventDetailModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      />

      <ServiceRequestModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />

      <ReportIssueModal
        isOpen={isReportIssueOpen}
        onClose={() => setIsReportIssueOpen(false)}
      />

      <EnergyManagementModal
        isOpen={isEnergyModalOpen}
        onClose={() => setIsEnergyModalOpen(false)}
      />

    </div>
  );
}
