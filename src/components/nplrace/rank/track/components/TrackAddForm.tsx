import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useRef } from "react";

interface TrackAddFormProps {
  onAddTrack: () => void;
}

export default function TrackAddForm({ onAddTrack }: TrackAddFormProps) {
  const trackAddProvinceSelectRef = useRef<HTMLSelectElement>(null);
  const trackAddKeywordInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid grid-cols-[120px,1fr,58px] gap-2">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="지역 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="서울시">서울시</SelectItem>
          <SelectItem value="부산시">부산시</SelectItem>
          {/* 다른 지역 옵션들 */}
        </SelectContent>
      </Select>
      <Input ref={trackAddKeywordInputRef} type="text" placeholder="키워드" />
      <Button onClick={onAddTrack}>추가</Button>
    </div>
  );
} 