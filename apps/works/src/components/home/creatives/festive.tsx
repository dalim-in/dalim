'use client';

import { useEffect, useState } from 'react';
import { Grid3 } from '@dalim/core/components/common/gallery';

export function Festive() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/works/festive')
      .then((res) => res.json())
      .then((data) => setImages(data.resources || []));
  }, []);

  return (
    <main>
      <Grid3 images={images} />
    </main>
  );
}
