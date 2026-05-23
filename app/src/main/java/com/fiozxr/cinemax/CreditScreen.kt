package com.fiozxr.cinemax

import androidx.compose.foundation.layout.*
import androidx.compose.ui.graphics.Color
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun CreditScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally
    ) {
        Text("CINEMAX", style = MaterialTheme.typography.headlineLarge, color = ActiveHighlight)
        Spacer(modifier = Modifier.height(16.dp))
        Text("Created by @fiozxr_", style = MaterialTheme.typography.bodyLarge, color = Color.White)
        Text("github.com/fiozxr", style = MaterialTheme.typography.bodyMedium, color = Color.LightGray)
    }
}
