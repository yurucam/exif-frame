package com.fiozxr.cinemax

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val SlateBlack = Color(0xFF0F1115)
val BottomSheetColor = Color(0xFF16191F)
val AccentBorder = Color(0xFF2F333D)
val ActiveHighlight = Color(0xFFD1E4FF)
val ActiveText = Color(0xFF003366)

private val DarkColorScheme = darkColorScheme(
    background = SlateBlack,
    surface = BottomSheetColor,
    primary = ActiveHighlight,
    onPrimary = ActiveText,
    outline = AccentBorder
)

val BentoShape = RoundedCornerShape(24.dp)
val BottomSheetShape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
val PillShape = RoundedCornerShape(50)

@Composable
fun CinemaxTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
