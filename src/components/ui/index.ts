/**
 * Design system — single import surface.
 *
 * Components here are consumed by the marketing pages and the style guide.
 * Each component is exported both by named export (for tree-shaking) and
 * here as a barrel so consumers can `import { Button, Card } from "@/components/ui"`.
 */

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export { Card, CardBody, CardHeader, CardFooter } from "./Card";
export type { CardProps, CardVariant, CardBodyProps, CardHeaderProps, CardFooterProps } from "./Card";

export { Hero } from "./Hero";
export type { HeroProps } from "./Hero";

export { HeroPhoto } from "./HeroPhoto";
export type { HeroPhotoProps } from "./HeroPhoto";

export { CaptionedPhoto } from "./CaptionedPhoto";
export type { CaptionedPhotoProps } from "./CaptionedPhoto";

export { LiveDataWidget, LiveDataGrid } from "./LiveDataWidget";
export type { LiveDataWidgetProps, LiveDataKind, LiveDataState } from "./LiveDataWidget";

export {
  FormField,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  Label,
} from "./Form";
export type {
  FormFieldProps,
  TextInputProps,
  TextAreaProps,
  SelectProps,
  CheckboxProps,
  LabelProps,
} from "./Form";

export { Logo, LogoCompare } from "./Logo";
export type { LogoProps, LogoMark } from "./Logo";

export { NavBar } from "./NavBar";
export type { NavBarProps, NavItem } from "./NavBar";

export { MegaMenu } from "./MegaMenu";
export type { MegaMenuProps } from "./MegaMenu";

export { ContentCard } from "./ContentCard";
export type { ContentCardProps, ContentCardAspect } from "./ContentCard";

// v6.1.1 (MSN-2962) — location-aware photo renderer (Commons + SVG)
export { LocationPhoto, DEFAULT_SIZES } from "./LocationPhoto";
export type { LocationPhotoProps } from "./LocationPhoto";

export { LocationCaptionedPhoto } from "./LocationCaptionedPhoto";
export type { LocationCaptionedPhotoProps } from "./LocationCaptionedPhoto";

export { Carousel, CarouselSlide } from "./Carousel";
export type { CarouselProps, CarouselSlideProps } from "./Carousel";

export { Footer } from "./Footer";
export type { FooterProps, FooterColumn } from "./Footer";

export { Icons } from "./Icon";
export type { IconProps, IconName } from "./Icon";

export { AffiliateBadge } from "./AffiliateBadge";
export type { AffiliateBadgeProps } from "./AffiliateBadge";

// v6.1 (MSN-2961-V6.1) — micro-interaction library
export { Accordion } from "./Accordion";
export type { AccordionItem, AccordionProps } from "./Accordion";

export { LightboxRoot, LightboxTrigger } from "./Lightbox";
export type { LightboxItem, LightboxRootProps, LightboxTriggerProps } from "./Lightbox";

export { Tabs } from "./Tabs";
export type { TabItem, TabsProps } from "./Tabs";

export { SearchOverlay } from "./SearchOverlay";
export type { SearchOverlayProps } from "./SearchOverlay";

// v6.3 (MSN-2964) — full-scope additions
export { EditorialGrid } from "./EditorialGrid";
export type {
  EditorialGridProps,
  EditorialGridItem,
  EditorialGridLayout,
} from "./EditorialGrid";

export { BeachReport } from "./BeachReport";
export type {
  BeachReportProps,
  BeachReportData,
  BeachReportVariant,
} from "./BeachReport";

export { TripPlanner } from "./TripPlanner";
export type {
  TripPlannerProps,
  WeatherSnapshot,
} from "./TripPlanner";
