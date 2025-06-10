import { IconMetadata } from "./types";
import { 
  ArrowBigDownMetadata, 
  ArrowBigDownDashMetadata, 
  ArrowBigUpDashMetadata, 
  ArrowBigUpMetadata, 
  ArrowBigRightDashMetadata, 
  ArrowBigRightMetadata, 
  ArrowBigLeftDashMetadata, 
  ArrowDownMetadata,
  ArrowDown01Metadata,
  ArrowDown10Metadata,
  ArrowDownAZMetadata,
  AArrowDownMetadata,
  AArrowUpMetadata,
  ALargeSmallMetadata,
  AppWindowMetadata,
  ArrowBigLeftMetadata ,
  AppWindowMacMetadata,
  Axis3dMetadata,
  BetweenHorizontalEndMetadata,
  BetweenHorizontalStartMetadata,
  BetweenVerticalEndMetadata,
  BetweenVerticalStartMetadata,
  BlendMetadata,
  BookTypeMetadata,
  AnvilMetadata,
  BrickWallMetadata,
  BuildingMetadata,
  Building01Metadata,
  CastleMetadata,
  ChurchMetadata,
  DamMetadata,
  FactoryMetadata,
  FenceMetadata,
  HospitalMetadata,
  HotelMetadata,
  HouseMetadata,
  AlignCenterHorizontalMetadata,
  AlignCenterVerticalMetadata,
  AlignEndHorizontalMetadata,
  AlignEndVerticalMetadata,
  AlignHorizontalDistributeCenterMetadata,
  AlignHorizontalDistributeEndMetadata,
  AlignHorizontalDistributeStartMetadata,
  AlignHorizontalJustifyCenterMetadata,
  AlignHorizontalJustifyEndMetadata,
  AlignHorizontalJustifyStartMetadata,
  AlignHorizontalSpaceAroundMetadata,
  AlignHorizontalSpaceBetweenMetadata,
  BadgeMetadata,
  BlocksMetadata,
  BoxMetadata,
  BoxesMetadata,
  CircleMetadata,
  CircleDashedMetadata,
  CircleDotMetadata,
  CircleDotDashedMetadata,
  CircleOffMetadata,
  CircleSlash2Metadata,
  CircleSmallMetadata,
  ClubMetadata
} from "./icons";

export const iconDatabase: Record<string, IconMetadata> = { 

  // Arrows

  "ArrowBigDown": ArrowBigDownMetadata,
  "ArrowBigDownDash": ArrowBigDownDashMetadata,
  "ArrowBigLeft": ArrowBigLeftMetadata,
  "ArrowBigLeftDash": ArrowBigLeftDashMetadata,
  "ArrowBigRight": ArrowBigRightMetadata,
  "ArrowBigRightDash": ArrowBigRightDashMetadata,
  "ArrowBigUp": ArrowBigUpMetadata,
  "ArrowBigUpDash": ArrowBigUpDashMetadata,
  "ArrowDown": ArrowDownMetadata,
  "ArrowDown01": ArrowDown01Metadata,
  "ArrowDown10": ArrowDown10Metadata,
  "ArrowDownAZ": ArrowDownAZMetadata,

  // Design

  "AArrowDown": AArrowDownMetadata,
  "AArrowUp": AArrowUpMetadata,
  "ALargeSmall": ALargeSmallMetadata,
  "AppWindow": AppWindowMetadata,
  "AppWindowMac": AppWindowMacMetadata,
  "Axis3d": Axis3dMetadata,
  "BetweenHorizontalEnd": BetweenHorizontalEndMetadata,
  "BetweenHorizontalStarta":BetweenHorizontalStartMetadata,
  "BetweenVerticalEnd": BetweenVerticalEndMetadata,
  "BetweenVerticalStart": BetweenVerticalStartMetadata,
  "Blend": BlendMetadata,
  "BookType": BookTypeMetadata,

  //Buildings
  
  "Anvil": AnvilMetadata,
  "BrickWall": BrickWallMetadata,
  "Building": BuildingMetadata,
  "Building01": Building01Metadata,
  "Castle": CastleMetadata,
  "Church": ChurchMetadata,
  "Dam": DamMetadata,
  "Factory": FactoryMetadata,
  "Fence": FenceMetadata,
  "Hospital": HospitalMetadata,
  "Hotel": HotelMetadata,
  "House": HouseMetadata,

  // Layout

  "AlignCenterHorizontal": AlignCenterHorizontalMetadata,
  "AlignCenterVertical": AlignCenterVerticalMetadata,
  "AlignEndHorizontal": AlignEndHorizontalMetadata,
  "AlignEndVertical": AlignEndVerticalMetadata,
  "AlignHorizontalDistributeCenter": AlignHorizontalDistributeCenterMetadata,
  "AlignHorizontalDistributeEnd": AlignHorizontalDistributeEndMetadata,
  "AlignHorizontalDistributeStart": AlignHorizontalDistributeStartMetadata,
  "AlignHorizontalJustifyCenter": AlignHorizontalJustifyCenterMetadata,
  "AlignHorizontalJustifyEnd": AlignHorizontalJustifyEndMetadata,
  "AlignHorizontalJustifyStart": AlignHorizontalJustifyStartMetadata,
  "AlignHorizontalSpaceAround": AlignHorizontalSpaceAroundMetadata,
  "AlignHorizontalSpaceBetween": AlignHorizontalSpaceBetweenMetadata,

  // Shapes

  "Badge": BadgeMetadata,
  "Blocks": BlocksMetadata,
  "Box": BoxMetadata,
  "Boxes": BoxesMetadata,
  "Circle": CircleMetadata,
  "CircleDashed": CircleDashedMetadata,
  "CircleDot": CircleDotMetadata,
  "CircleDotDashed": CircleDotDashedMetadata,
  "CircleOff": CircleOffMetadata,
  "CircleSlash2": CircleSlash2Metadata,
  "CircleSmall": CircleSmallMetadata,
  "Club": ClubMetadata

};

// Get all icons
export function getAllIcons(): IconMetadata[] {
  return Object.values(iconDatabase);
}

// Get icon by name
export function getIconByName(name: string): IconMetadata | undefined {
  return iconDatabase[name];
}

// Get icons by category
export function getIconsByCategory(category: string): IconMetadata[] {
  return Object.values(iconDatabase).filter(icon => icon.category === category);
}

// Get icons by tag
export function getIconsByTag(tag: string): IconMetadata[] {
  return Object.values(iconDatabase).filter(icon => 
    icon.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(iconDatabase).forEach(icon => {
    categories.add(icon.category);
  });
  return Array.from(categories);
}

// Get all tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  Object.values(iconDatabase).forEach(icon => {
    icon.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

// Search icons
export function searchIcons(query: string): IconMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(iconDatabase).filter(icon => 
    icon.name.toLowerCase().includes(lowercaseQuery) ||
    icon.category.toLowerCase().includes(lowercaseQuery) ||
    icon.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (icon.description && icon.description.toLowerCase().includes(lowercaseQuery))
  );
}
