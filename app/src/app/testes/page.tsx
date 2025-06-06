"use client";

import { Button, Stack, Text } from "@chakra-ui/react"

export default function Testes() {
  
  return (
    <>
    <Stack gap="2" align="flex-start">
        <Stack align="center" direction="row" gap="10">
          <Button colorPalette="purple">Button</Button>
          <Button colorPalette="purple" variant="outline">
            Button
          </Button>
          <Button colorPalette="purple" variant="surface">
            Button
          </Button>
          <Button colorPalette="cyan" variant="subtle">
            Button
          </Button>
        </Stack>
    </Stack>
    </>
  );

}