import { DALIM_URL } from "@dalim/auth";

export async function getFonts() {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch fonts");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching fonts:", error);
    throw error;
  }
}

/**
 * Get a font by ID
 */
export async function getFontById(id: string) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts/${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch font");
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching font with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Upload a new font
 */
export async function uploadFont(formData: FormData) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error("Failed to upload font");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error uploading font:", error);
    throw error;
  }
}

/**
 * Update a font
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateFont(id: string, data: any) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update font");
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error updating font with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a font
 */
export async function deleteFont(id: string) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete font");
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error deleting font with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Increment font view count
 */
export async function incrementFontViewCount(id: string) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts/${id}/view`, {
      method: "POST",
    });
    
    if (!response.ok) {
      throw new Error("Failed to increment view count");
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error incrementing view count for font with ID ${id}:`, error);
    // Silently fail for view counts
    return null;
  }
}

/**
 * Increment font download count
 */
export async function incrementFontDownloadCount(id: string) {
  try {
    const response = await fetch(`${DALIM_URL}/api/fonts/${id}/download`, {
      method: "POST",
    });
    
    if (!response.ok) {
      throw new Error("Failed to increment download count");
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error incrementing download count for font with ID ${id}:`, error);
    // Silently fail for download counts
    return null;
  }
}
 