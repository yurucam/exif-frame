package com.fiozxr.cinemax

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun CinemaxApp() {
    CinemaxTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Box(modifier = Modifier.fillMaxSize()) {
                CameraPreview(modifier = Modifier.fillMaxSize())

                // Bottom Control Panel simulating Bento Grid Style
                BottomSheetControls(
                    modifier = Modifier
                        .align(androidx.compose.ui.Alignment.BottomCenter)
                        .fillMaxWidth()
                        .height(300.dp)
                )
            }
        }
    }
}

@Composable
fun BottomSheetControls(modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier,
        shape = BottomSheetShape,
        color = BottomSheetColor,
        border = androidx.compose.foundation.BorderStroke(1.dp, AccentBorder)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Text("Controls", color = ActiveHighlight, style = MaterialTheme.typography.titleMedium)
            Spacer(modifier = Modifier.height(16.dp))

            // Bento Grid Slots Mockup
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                BentoCard("ISO", "800", Modifier.weight(1f))
                BentoCard("WB", "5600K", Modifier.weight(1f))
                BentoCard("Focus", "Auto", Modifier.weight(1f))
            }
            Spacer(modifier = Modifier.height(16.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                BentoCard("LUT", "Cinematic", Modifier.weight(1f))
                BentoCard("Grain", "On", Modifier.weight(1f))
                BentoCard("EXIF", "Log", Modifier.weight(1f))
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BentoCard(title: String, value: String, modifier: Modifier = Modifier) {
    var active by remember { mutableStateOf(false) }

    Card(
        modifier = modifier
            .height(80.dp)
            .padding(2.dp),
        shape = BentoShape,
        colors = CardDefaults.cardColors(
            containerColor = if (active) ActiveHighlight else SlateBlack
        ),
        onClick = { active = !active }
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally
        ) {
            Text(title, color = if (active) ActiveText else Color.LightGray, style = MaterialTheme.typography.labelMedium)
            Text(value, color = if (active) ActiveText else Color.White, style = MaterialTheme.typography.bodyLarge)
        }
    }
}
