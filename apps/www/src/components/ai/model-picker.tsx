"use client";
import { MODELS, type modelID } from "@/src/actions/providers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select";

interface ModelPickerProps {
  selectedModel: modelID;
  setSelectedModel: (model: modelID) => void;
}

export const ModelPicker = ({
  selectedModel,
  setSelectedModel,
}: ModelPickerProps) => {
  return (
    <div className="absolute bottom-2 left-2 flex flex-col gap-2">
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MODELS.map((modelId) => (
              <SelectItem key={modelId} value={modelId}>
                {modelId}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
